import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";

export function Auth({ register = false }: { register?: boolean }) {
  const nav = useNavigate();
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login.mutate(
      { email, password },
      { onSuccess: () => nav("/reader") },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <Input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      <Input
        required
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />
      {login.isError && (
        <p className="text-sm text-red-600">{login.error.message}</p>
      )}
      <Button className="w-full" disabled={login.isPending}>
        {login.isPending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}