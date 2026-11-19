import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container py-5 text-center">
      <h1 className="page-title">Page not found</h1>
      <p className="text-muted">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-brand">Back to home</Link>
    </div>
  );
}
