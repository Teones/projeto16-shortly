CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
);



CREATE TABLE "links" (
	"id" serial NOT NULL,
	"url" varchar(255) NOT NULL,
	"urlCompressed" varchar(255) NOT NULL UNIQUE,
	"visitors" int NOT NULL,
	"userId" int NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "links_pk" PRIMARY KEY ("id")
);



CREATE TABLE "tokens" (
	"id" serial NOT NULL,
	"userId" int NOT NULL,
	"value" uuid NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "tokens_pk" PRIMARY KEY ("id")
);




ALTER TABLE "links" ADD CONSTRAINT "links_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "tokens" ADD CONSTRAINT "tokens_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");



