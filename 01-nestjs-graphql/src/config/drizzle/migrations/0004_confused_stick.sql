DO $$ BEGIN
 ALTER TABLE "pets" ADD CONSTRAINT "pets_owner_id_owners_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."owners"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "pets" ADD CONSTRAINT "pets_owner_id_unique" UNIQUE("owner_id");