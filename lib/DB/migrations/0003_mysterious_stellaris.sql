ALTER TABLE "orders" RENAME TO "colors";--> statement-breakpoint
ALTER TABLE "user_to_colors_doc" DROP CONSTRAINT "user_to_colors_doc_color_id_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "user_to_colors_doc" ADD CONSTRAINT "user_to_colors_doc_color_id_colors_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."colors"("id") ON DELETE no action ON UPDATE no action;