import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import Users from "./collections/Users";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [
    Users,
    {
      slug: "test",
      fields: [
        {
          name: "blocks",
          type: "blocks",
          blocks: [
            {
              slug: "testType",
              fields: [
                {
                  name: "text",
                  type: "text",
                  localized: true,
                },
                {
                  name: "arr",
                  type: "array",
                  fields: [
                    {
                      name: "text",
                      type: "text",
                      localized: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  globals: [
    {
      slug: "testGlobal",
      fields: [
        {
          name: "blocks",
          type: "blocks",
          blocks: [
            {
              slug: "testType",
              fields: [
                {
                  name: "text",
                  type: "text",
                  localized: true,
                },
                {
                  name: "arr",
                  type: "array",
                  fields: [
                    {
                      name: "text",
                      type: "text",
                      localized: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  localization: {
    defaultLocale: "en",
    locales: [
      { code: "en", label: "English" },
      { code: "ua", label: "Ukrainian" },
    ],
  },
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
});
