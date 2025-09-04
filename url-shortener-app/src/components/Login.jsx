import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const schema = z.object({
  email: z.email(),
  password: z.string().min(3).max(15),
});

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const res = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Login failed');
      const result = await res.json();
      
      if(result.message !== 'User logged in successfully!') {
        alert('Login failed');
        return;
      }
      navigate('/welcome');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <input {...register('email')} placeholder="Email" />
        <p className="error">{errors.email?.message}</p>
        <input type="text" {...register('password')} placeholder="Password" />
        <p className="error">{errors.password?.message}</p>
        <button type="submit">Login</button>
      </form>
      <p>New user? <Link to="/register">Register</Link></p>
      <p>Home <Link to="/home">Home</Link></p>
    </div>
  );
}

export default LoginPage;