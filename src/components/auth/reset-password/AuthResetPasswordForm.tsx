
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function AuthResetPasswordForm() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [errMsg , setErrMsg] = useState("");
  const [isLoading , setIsLoading] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(`https://sync-lab-backend-cwqc.onrender.com/reset-password/${token}`, { password });
      setMsg(res.data.message);
    } catch (err:any) {
      setErrMsg(err.response?.data?.message || "Reset failed");
    }finally{
        setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          type="password"
          placeholder="Enter new password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button disabled={isLoading} > {isLoading && <Loader2 className="animate-spin" />}  Reset Password</Button>
      </form>
      {msg && <p className="mt-3 text-sm bg-success/10 text-success p-2 w-fit">{msg}</p>}
      {errMsg && <p className="mt-3 text-sm bg-error/10 text-error rounded-full p-2 w-fit">{errMsg}</p>}
    </div>
  );
}
