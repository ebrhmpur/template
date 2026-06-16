CREATE TABLE "user_to_colors_doc" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"color_id" integer
);
--> statement-breakpoint
ALTER TABLE "user_to_colors_doc" ADD CONSTRAINT "user_to_colors_doc_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_to_colors_doc" ADD CONSTRAINT "user_to_colors_doc_color_id_orders_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "user_id";