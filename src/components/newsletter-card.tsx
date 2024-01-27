"use client";



import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { subscribeToNewsLetter } from "@/lib/request";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ClientError } from "graphql-request";

export default function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  // use the usemutation hook
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["newsletter"],
    mutationFn: subscribeToNewsLetter,
    onError: onError,
    onSuccess: onSuccess,
  });

  // create a local storage entry
  function onSuccess() {
    localStorage.setItem("newsletter", email);
    toast.success(
      "subscribed to newsletter : check email to confirm your subscription"
    );
    setOpen(false);
  }
    // for every error , there'll be a parameter passed in
    function onError(err: ClientError) {
      if (!err.response.errors) return toast.error("Something went wrong!");
      toast.error(err.response.errors[0]!.message);
    }

  function handleOpen() {
    if (localStorage.getItem("newsletter")) return;

    setOpen(true);
  }

  //set a timeer for the newsleter
  useEffect(() => {
    setTimeout(() => {
      handleOpen();
    }, 5000);
  }, []);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent>
        <DialogHeader>
          <h1 className="text-2xl font-bold">Join the newsletter!</h1>
        </DialogHeader>
        <p>
          Enter your email to join the newsletter and stay up to date with the
          latest posts published in Tmeghablog!
        </p>
        <div className="flex flex-col gap-5 mt-3">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={() => mutateAsync(email)} disabled={isPending}>
            {isPending ? "Loading..." : "Subscribe"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


