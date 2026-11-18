import { useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { demo } from "@/lib/demo/store";

export function AddToGarden({ speciesId, name }: { speciesId: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus aria-hidden />Add to My Garden</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add {name}</DialogTitle></DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const plant = demo.addPlant(speciesId, { nickname, location });
            setOpen(false);
            toast.success(`${plant.nickname} added to My Garden.`);
            navigate({ to: "/garden/$plantId", params: { plantId: plant.id } });
          }}
        >
          <FormField label="Nickname" hint="Optional"><Input value={nickname} maxLength={40} onChange={(e) => setNickname(e.target.value)} placeholder={name} /></FormField>
          <FormField label="Where is it?" hint="Optional"><Input value={location} maxLength={60} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Patio, by the door" /></FormField>
          <DialogFooter><Button type="submit">Add plant</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
