CREATE TABLE IF NOT EXISTS "owners" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pets" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "breed" text;--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "owner_id" integer;