import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["public/content"],
      models: [
        {
          name: "IndexPage",
          type: "page",
          urlPath: "/",
          filePath: "public/content/index.json",
          fields: [
            { name: "hero", type: "object", fields: [
              { name: "title", type: "string", required: true },
              { name: "location", type: "string" },
              { name: "description", type: "text" },
              { name: "button", type: "string" }
            ]},
            { name: "about", type: "object", fields: [
              { name: "title", type: "string", required: true },
              { name: "description", type: "text" },
              { name: "button", type: "string" }
            ]},
            { name: "recent_projects", type: "object", fields: [
              { name: "title", type: "string", required: true },
              { name: "view_all", type: "string" },
              { name: "projects", type: "list", items: { type: "object", fields: [
                { name: "category", type: "string" },
                { name: "title", type: "string", required: true }
              ]}}
            ]},
            { name: "services", type: "object", fields: [
              { name: "title", type: "string", required: true },
              { name: "items", type: "list", items: { type: "object", fields: [
                { name: "title", type: "string", required: true },
                { name: "description", type: "text" }
              ]}}
            ]},
            { name: "testimonials", type: "object", fields: [
              { name: "title", type: "string", required: true },
              { name: "subtitle", type: "string" },
              { name: "items", type: "list", items: { type: "object", fields: [
                { name: "quote", type: "text", required: true },
                { name: "author", type: "string", required: true },
                { name: "position", type: "string" }
              ]}}
            ]},
            { name: "contact", type: "object", fields: [
              { name: "title", type: "string", required: true },
              { name: "description", type: "text" },
              { name: "button", type: "string" }
            ]},
            { name: "contact_info", type: "object", fields: [
              { name: "title", type: "string", required: true },
              { name: "email", type: "string" },
              { name: "email_link_text", type: "string" },
              { name: "legal_title", type: "string" },
              { name: "kvk", type: "string" },
              { name: "privacy_policy", type: "string" },
              { name: "social_title", type: "string" }
            ]}
          ]
        }
      ],
      assetsConfig: {
        referenceType: "static",
        staticDir: "public",
        uploadDir: "images",
        publicPath: "/"
      }
    })
  ]
});