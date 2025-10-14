import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [errorMsg , setErrorMsg] = useState("");
  const [isLoading , setIsLoading] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post("https://sync-lab-backend-cwqc.onrender.com/forgot-password", { email });
      // const res = await axios.post("http://localhost:8080/forgot-password", { email });
      setMsg(res.data.message);
    } catch (err:any) {
      console.log(err)
      setErrorMsg(err.response?.data?.message || "Error sending link");
    }finally{
        setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input type="email" placeholder="Enter you email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button disabled={isLoading} >
          {isLoading && <Loader2 className="animate-spin" />}
          Send Reset Link
        </Button>
      </form>
      {msg && <p className="mt-3 text-sm text-success bg-success/10 rounded-full p-2 w-fit">{msg}</p>}
      {errorMsg && <p className="mt-3 text-sm text-red-500 bg-red-500/10 rounded-full p-2 w-fit">{errorMsg}</p>}
    </div>
  );
}
