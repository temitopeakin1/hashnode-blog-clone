"use client";

import { Dialog, DialogContent } from "@radix-ui/react-dialog";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import { subscribeToNewsLetter } from "@/lib/request";
import { useMutation } from "@tanstack/react-query";

export default function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false)

  // use the usemutation hook
  const {mutateAsync, isPending} = useMutation({
    mutationKey: ["newsletter"],
    mutationFn: subscribeToNewsLetter,
    onError: onError,
    onSuccess: onSuccess,
  });

  function onError() {

  }

  function onSuccess() {
    localStorage.setItem("newsletter", email);
alert ()
    setOpen(false);
  }
// create a local storage entry

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
  )
}
 