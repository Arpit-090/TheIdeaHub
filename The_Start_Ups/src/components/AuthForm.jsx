import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AuthForm = ({ type, onSubmit, serverError }) => {
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      await onSubmit(data);
    } catch (err) {
      console.error(`${type} error:`, err);
      toast.error(`${type} failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const isLogin = type === 'login';
  const title = isLogin ? 'Login to IdeaHub' : 'Create an Account';
  const subtitle = isLogin 
    ? 'Share and discover innovative ideas' 
    : 'Join IdeaHub to share your ideas';

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{title}</h2>
        <p className="subtitle">{subtitle}</p>

        {serverError && <div className="error-message">{serverError}</div>}

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Username must be less than 20 characters',
                  },
                })}
                autoComplete="username"
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username.message}</div>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              autoComplete="email"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match',
                })}
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword.message}</div>
              )}
            </div>
          )}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {isLogin ? 'Logging in...' : 'Registering...'}
              </>
            ) : (
              isLogin ? 'Login' : 'Register'
            )}
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? (
            <>
              <p>
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
              <p>
                <Link to="/forgot-password">Forgot password?</Link>
              </p>
            </>
          ) : (
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  type: PropTypes.oneOf(['login', 'register']).isRequired,
  onSubmit: PropTypes.func.isRequired,
  serverError: PropTypes.string,
};

export default AuthForm;