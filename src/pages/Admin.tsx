import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Button,
  Card,
  CardContent,
  Badge,
  Label,
  Input,
  Textarea,
} from '@zwa/ui';
import {
  BarChart3,
  Lock,
  LogOut,
  Star,
  Trash2,
  Upload,
  Eye,
  ArrowLeft,
  Pencil,
  X,
} from '@zwa/icons';
import { usePageTitle } from '@zwa/seo';
import {
  createResourceDraft,
  deleteResource,
  fileToDataUrl,
  getAllResources,
  getFeaturedIds,
  isAdminAuthenticated,
  isCatalogResource,
  loginAdmin,
  logoutAdmin,
  toggleFeatured,
  upsertResource,
  featureResource,
} from '@/lib/admin-store';
import {
  getConversionMetrics,
  getTotalConversions,
  resetConversionMetrics,
  type ConversionMetric,
} from '@/lib/analytics';
import type { Resource, Tag } from '@/lib/types';
import { ALL_TOPICS, TOPIC_LABELS } from '@/lib/types';
import { formatDate } from '@/lib/format';

const TOPIC_OPTIONS: Tag[] = ALL_TOPICS;

type FormMode = 'create' | 'edit';

const emptyForm = () => ({
  title: '',
  summary: '',
  url: '',
  content: '',
  topics: ['organics'] as Tag[],
  coverDataUrl: undefined as string | undefined,
  keepExistingCover: true,
});

export function Admin() {
  usePageTitle('Admin');
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [featuredIds, setFeaturedIdsState] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<ConversionMetric[]>([]);
  const [formMode, setFormMode] = useState<FormMode>('create');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingSlug, setEditingSlug] = useState<string>('');
  const [editingPublishDate, setEditingPublishDate] = useState<string>('');
  const [existingCover, setExistingCover] = useState<string | undefined>();
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const refresh = () => {
    try {
      setResources(getAllResources());
      setFeaturedIdsState(getFeaturedIds());
      setMetrics(getConversionMetrics());
    } catch (err) {
      console.error('Admin refresh failed:', err);
      setResources([]);
    }
  };

  useEffect(() => {
    setAuthed(isAdminAuthenticated());
  }, []);

  useEffect(() => {
    if (!authed) return;
    refresh();
    // Re-read once more after paint — avoids empty list right after login
    const t = window.setTimeout(() => refresh(), 0);
    return () => window.clearTimeout(t);
  }, [authed]);

  const total = useMemo(() => getTotalConversions(), [metrics]);

  const resetForm = () => {
    setFormMode('create');
    setEditingId(null);
    setEditingSlug('');
    setEditingPublishDate('');
    setExistingCover(undefined);
    setForm(emptyForm());
    setFormError('');
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setLoginError('');
      setPassword('');
      setAuthed(true);
      refresh();
    } else {
      setLoginError('Incorrect password.');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setAuthed(false);
  };

  const handleToggleFeatured = (id: string) => {
    setFeaturedIdsState(toggleFeatured(id));
  };

  const handleCoverChange = async (file: File | null) => {
    if (!file) {
      setForm(prev => ({ ...prev, coverDataUrl: undefined }));
      return;
    }
    if (!file.type.startsWith('image/')) {
      setFormError('Cover must be an image file.');
      return;
    }
    if (file.size > 500 * 1024) {
      setFormError('Cover image must be under 500 KB (browser storage limit).');
      return;
    }
    setFormError('');
    const dataUrl = await fileToDataUrl(file);
    setForm(prev => ({ ...prev, coverDataUrl: dataUrl, keepExistingCover: false }));
  };

  const startEdit = (resource: Resource) => {
    setFormMode('edit');
    setEditingId(resource.id);
    setEditingSlug(resource.slug);
    setEditingPublishDate(resource.publishDate);
    setExistingCover(resource.cover);
    setForm({
      title: resource.title,
      summary: resource.summary,
      url: resource.url || '',
      content: resource.content || '',
      topics: resource.topics.length ? [...resource.topics] : ['organics'],
      coverDataUrl: undefined,
      keepExistingCover: true,
    });
    setFormError('');
    setFormSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setFormSuccess('');
    if (form.title.trim().length < 3) {
      setFormError('Title must be at least 3 characters.');
      return;
    }
    if (form.summary.trim().length < 10) {
      setFormError('Summary must be at least 10 characters.');
      return;
    }

    const cover =
      form.coverDataUrl ??
      (formMode === 'edit' && form.keepExistingCover ? existingCover : undefined);

    try {
      if (formMode === 'edit' && editingId) {
        upsertResource({
          id: editingId,
          slug: editingSlug,
          title: form.title.trim(),
          summary: form.summary.trim(),
          topics: form.topics.length ? form.topics : ['organics'],
          publishDate: editingPublishDate || new Date().toISOString().slice(0, 10),
          cover,
          url: form.url.trim() || undefined,
          content: form.content.trim() || form.summary.trim(),
        });
        setFormSuccess('Resource updated. Changes show on the homepage and detail pages.');
      } else {
        const resource = createResourceDraft({
          title: form.title.trim(),
          summary: form.summary.trim(),
          topics: form.topics,
          cover,
          url: form.url.trim() || undefined,
          content: form.content.trim() || undefined,
        });
        upsertResource(resource);
        featureResource(resource.id);
        setFormSuccess('Resource saved and featured on the homepage.');
      }
      resetForm();
      refresh();
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : 'Could not save. Try a smaller cover image (under ~500 KB).'
      );
    }
  };

  const handleDelete = (resource: Resource) => {
    const label = isCatalogResource(resource.id) ? 'catalog' : 'uploaded';
    if (
      !confirm(
        `Delete this ${label} resource?\n\n“${resource.title}”\n\nIt will disappear from the homepage and library in this browser.`
      )
    ) {
      return;
    }
    deleteResource(resource.id);
    if (editingId === resource.id) resetForm();
    refresh();
  };

  const handleResetMetrics = () => {
    if (!confirm('Reset all conversion metrics on this browser?')) return;
    resetConversionMetrics();
    refresh();
  };

  if (!authed) {
    return (
      <Container className="py-12 md:py-16">
        <Card className="mx-auto max-w-md">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-fg">Admin</h1>
                <p className="text-sm text-fg-muted">Manage resources & conversion metrics</p>
              </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                {loginError && <p className="mt-1 text-xs text-red-500">{loginError}</p>}
              </div>
              <Button type="submit" variant="primary" className="w-full">
                Sign in
              </Button>
            </form>
            <p className="mt-4 text-xs text-fg-muted">
              Data is stored in this browser. Set <code className="text-fg">VITE_ADMIN_PASSWORD</code> to
              change the password.
            </p>
          </CardContent>
        </Card>
      </Container>
    );
  }

  const coverPreview = form.coverDataUrl || (form.keepExistingCover ? existingCover : undefined);

  return (
    <Container className="py-8 md:py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to="/" className="mb-2 inline-flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
          <h1 className="text-2xl font-bold text-fg md:text-3xl">Site Admin</h1>
          <p className="text-sm text-fg-muted">
            Edit, feature, or delete any resource — including the bulk catalog.
          </p>
        </div>
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>

      {/* Metrics */}
      <section className="mb-12" aria-labelledby="metrics-heading">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="metrics-heading" className="flex items-center gap-2 text-xl font-bold text-fg">
            <BarChart3 className="h-5 w-5 text-primary" />
            Conversion metrics
          </h2>
          <Button variant="outline" size="sm" onClick={handleResetMetrics}>
            Reset metrics
          </Button>
        </div>
        <Card className="mb-4 border-primary/20 bg-primary/5">
          <CardContent className="p-4 sm:p-6">
            <p className="text-sm font-medium uppercase tracking-wide text-fg-muted">Total tracked actions</p>
            <p className="text-3xl font-bold text-primary md:text-4xl">{total}</p>
            <p className="mt-1 text-xs text-fg-muted">Counts clicks on key CTAs in this browser only.</p>
          </CardContent>
        </Card>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map(m => (
            <Card key={m.event}>
              <CardContent className="p-4">
                <p className="text-sm font-medium text-fg">{m.label}</p>
                <p className="mt-1 text-2xl font-bold text-primary">{m.count}</p>
                <p className="mt-1 text-xs text-fg-muted">
                  {m.lastAt ? `Last: ${formatDate(m.lastAt.slice(0, 10))}` : 'No events yet'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Create / Edit */}
      <section className="mb-12" aria-labelledby="editor-heading">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="editor-heading" className="flex items-center gap-2 text-xl font-bold text-fg">
            {formMode === 'edit' ? (
              <>
                <Pencil className="h-5 w-5 text-primary" />
                Edit resource
              </>
            ) : (
              <>
                <Upload className="h-5 w-5 text-primary" />
                Add resource
              </>
            )}
          </h2>
          {formMode === 'edit' && (
            <Button type="button" variant="ghost" size="sm" onClick={resetForm}>
              <X className="h-4 w-4" />
              Cancel edit
            </Button>
          )}
        </div>
        <Card className={formMode === 'edit' ? 'border-primary/40' : undefined}>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Label htmlFor="res-title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="res-title"
                  value={form.title}
                  onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="res-summary">
                  Summary <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="res-summary"
                  value={form.summary}
                  onChange={e => setForm(prev => ({ ...prev, summary: e.target.value }))}
                  rows={3}
                  required
                />
              </div>
              <div>
                <Label htmlFor="res-content">Full description (optional)</Label>
                <Textarea
                  id="res-content"
                  value={form.content}
                  onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))}
                  rows={5}
                />
              </div>
              <div>
                <Label htmlFor="res-url">External URL (optional)</Label>
                <Input
                  id="res-url"
                  type="url"
                  value={form.url}
                  onChange={e => setForm(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://"
                />
              </div>
              <div>
                <Label htmlFor="res-cover">Cover image (optional, max 500 KB)</Label>
                <Input
                  id="res-cover"
                  type="file"
                  accept="image/*"
                  onChange={e => handleCoverChange(e.target.files?.[0] ?? null)}
                />
                {coverPreview && (
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    className="mt-3 h-28 w-full max-w-xs rounded-lg border border-border object-cover"
                  />
                )}
                {formMode === 'edit' && existingCover && !form.coverDataUrl && (
                  <p className="mt-1 text-xs text-fg-muted">Keeping current cover unless you upload a new one.</p>
                )}
              </div>
              <fieldset>
                <legend className="mb-2 text-sm font-medium text-fg">Topics</legend>
                <div className="flex flex-wrap gap-2">
                  {TOPIC_OPTIONS.map(topic => {
                    const active = form.topics.includes(topic);
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() =>
                          setForm(prev => ({
                            ...prev,
                            topics: active
                              ? prev.topics.filter(t => t !== topic)
                              : [...prev.topics, topic],
                          }))
                        }
                        className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                          active
                            ? 'border-primary bg-primary text-white'
                            : 'border-border bg-bg text-fg-muted hover:border-primary'
                        }`}
                      >
                        {TOPIC_LABELS[topic]}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              {formError && <p className="text-xs text-red-500">{formError}</p>}
              {formSuccess && <p className="text-xs text-green-600">{formSuccess}</p>}
              <Button type="submit" variant="primary">
                {formMode === 'edit' ? (
                  <>
                    <Pencil className="h-4 w-4" />
                    Update resource
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Save resource
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* All resources */}
      <section aria-labelledby="library-heading">
        <h2 id="library-heading" className="mb-2 flex items-center gap-2 text-xl font-bold text-fg">
          <Star className="h-5 w-5 text-secondary" />
          All resources ({resources.length})
        </h2>
        <p className="mb-4 text-sm text-fg-muted">
          Feature up to 3 for the homepage. Edit or delete any item — catalog and uploads.
        </p>
        <div className="space-y-3">
          {resources.map(resource => {
            const isFeatured = featuredIds.includes(resource.id);
            const isCatalog = isCatalogResource(resource.id);
            const isEditing = editingId === resource.id;
            return (
              <Card
                key={resource.id}
                className={
                  isEditing
                    ? 'border-primary/50 bg-primary/5'
                    : isFeatured
                      ? 'border-secondary/50 bg-secondary/5'
                      : ''
                }
              >
                <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  {resource.cover ? (
                    <img
                      src={resource.cover}
                      alt=""
                      className="h-20 w-full shrink-0 rounded-lg object-cover sm:h-16 sm:w-24"
                    />
                  ) : (
                    <div className="flex h-20 w-full shrink-0 items-center justify-center rounded-lg bg-bg-muted sm:h-16 sm:w-24">
                      <Eye className="h-5 w-5 text-fg-muted" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap gap-1">
                      {resource.topics.map(t => (
                        <Badge key={t} variant="green">
                          {TOPIC_LABELS[t] ?? t}
                        </Badge>
                      ))}
                      <Badge variant="default">{isCatalog ? 'Catalog' : 'Uploaded'}</Badge>
                    </div>
                    <h3 className="line-clamp-2 font-semibold text-fg">{resource.title}</h3>
                    <p className="line-clamp-2 text-xs text-fg-muted">{resource.summary}</p>
                    <p className="mt-1 text-xs text-fg-muted">{formatDate(resource.publishDate)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:flex-col sm:items-stretch">
                    <Button
                      type="button"
                      variant={isFeatured ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleToggleFeatured(resource.id)}
                    >
                      <Star className="h-4 w-4" />
                      {isFeatured ? 'Featured' : 'Feature'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(resource)}
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(resource)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </Container>
  );
}
