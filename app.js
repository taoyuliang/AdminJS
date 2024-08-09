import AdminJS, {
  ComponentLoader,
  useCurrentAdmin,
  DefaultAuthProvider,
} from "adminjs"
import AdminJSExpress from "@adminjs/express"
import express from "express"
import Connect from "connect-pg-simple"
import session from "express-session"
import Plugin from "@adminjs/express"
// import { Adapter, Database, Resource } from "@adminjs/sql"
import { Database, Resource, getModelByName } from "@adminjs/prisma"
import prisma from "./db.js"
import * as url from "url"
import path from "path"
import mFetch from "./routers/mFetch.js"
import cors from "cors"
import bodyparser from "body-parser"
import uploadFeature from "@adminjs/upload"
import loggerFeature, { createLoggerResource } from "@adminjs/logger"
import importExportFeature from "@adminjs/import-export"
import {
  owningRelationSettingsFeature,
  targetRelationSettingsFeature,
} from "@adminjs/relations"
// const prisma = new PrismaClient()
// process.env.NODE_ENV = "production"
process.env.NODE_ENV = "development"
// console.log(process.env.NODE_ENV === "production")
const __dirname = url.fileURLToPath(new URL(".", import.meta.url))
const componentLoader = new ComponentLoader()
AdminJS.registerAdapter({
  Database,
  Resource,
})

const PORT = 3000
const RelationType = Object.freeze({
  OneToMany: Symbol("one-to-many"), // Colors.RED.description
  ManyToMany: Symbol("many-to-many"),
})

const DEFAULT_ADMIN = {
  email: "admin@splunk.com",
  title: "PM",
  // avatarUrl:"",
  password: "password",
  id: "S_002",
}

const authenticate = async ({ email, password }, ctx) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return DEFAULT_ADMIN
  }
  return null
}

const start = async () => {
  const app = express()
  // const db = await new Adapter("postgresql", {
  //   connectionString: "postgres://adminjs:changeme@localhost:5432/adminjs",
  //   database: "adminjs",
  // }).init()
  const admin = new AdminJS({
    resources: [
      {
        resource: { model: getModelByName("supplier"), client: prisma },
        options: { id: "supplier", titleProperty: "company" }, // Feature Log use titleProperty to show field "Record Title"
        features: [
          // loggerFeature({
          //   componentLoader,
          //   propertiesMapping: {
          //     user: "userId", // Save authenticate func's return obj's id value to userId field of Entity Log
          //   },
          //   // userIdAttribute: "id", // Me: defaluts to "id"
          // }),
          owningRelationSettingsFeature({
            componentLoader,
            licenseKey: "Hacked and Recompiled",
            relations: {
              logs: {
                type: RelationType.OneToMany.description,
                target: {
                  joinKey: "supplier",
                  resourceId: "Log",
                },
              },
            },
          }),
        ],
      },
      {
        resource: { model: getModelByName("s_routes"), client: prisma },
        options: {
          id: "s_routes",
          properties: {
            arr: { isArray: true, isDraggable: false, type: "mixed" },
            "arr.ratio": {
              type: "string", // PostgreSQL text
            },
            "arr.r45": {
              type: "number", // PostgreSQL numeric
            },
            "arr.r100": {
              type: "number",
            },
            "arr.r300": {
              type: "number",
            },
            "arr.r500": {
              type: "number",
            },
            "arr.r1000": {
              type: "number",
            },
            // Example from Documentation
            // "photoImage.tags": {
            //   reference: "Tag",
            //   isArray: true,
            // },
          },
        },
        features: [importExportFeature({ componentLoader })],
      },
      {
        resource: { model: getModelByName("upload_file"), client: prisma },
        options: {
          properties: {
            s3Key: {
              type: "string",
              isVisible: {
                edit: false,
                show: true,
                list: true,
                filter: true,
              },
            },
            bucket: {
              type: "string",
              isVisible: {
                edit: false,
                show: true,
                list: true,
                filter: true,
              },
            },
            mime: {
              type: "string",
              isVisible: {
                edit: false,
                show: true,
                list: true,
                filter: true,
              },
            },
            comment: {
              type: "textarea",
              isSortable: false,
            },
          },
        },
        features: [
          uploadFeature({
            componentLoader,
            provider: {
              local: {
                bucket: "public/files",
                opts: {
                  baseUrl: "/files",
                },
              },
            },
            properties: {
              file: "file",
              key: "s3Key",
              bucket: "bucket",
              mimeType: "mime",
            },
            validation: {
              mimeTypes: ["image/png", "image/jpeg"],
            },
          }),
        ],
      },
      {
        features: [targetRelationSettingsFeature()],
        ...createLoggerResource({
          componentLoader: componentLoader,
          resource: { model: getModelByName("Log"), client: prisma },
          featureOptions: {
            propertiesMapping: {
              user: "userId", // Mandatory, user is field of Frontend UI, userId is field of Entity Log
              // resourceOptions: { // BUG,not working, have to manully do obj.options.navigation={name,icon}
              //   navigation: {
              //     name: "SectionName",
              //     icon: "iconName",
              //   },
              // },
            },
          },
        }),
      },
    ],
    dashboard: {
      component: componentLoader.add("Dashboard", "./dashboard"),
    },
    componentLoader,
    branding: {
      companyName: "Your project name",
      softwareBrothers: false,
      logo: false, // OR false to hide the default one
    },
    locale: {
      language: "en",
      translations: {
        labels: {
          // navigation: "Навигација",
          // pages: "Страници",
          // selectedRecords: "Избрано ({{selected}})",
          // filters: "Филтри",
          // adminVersion: "Администратор: {{version}}",
          // appVersion: "Апликација: {{version}}",
          loginWelcome: "A Big Welcome !",
          // dashboard: "Контролна табла",
        },
        messages: {
          loginWelcome: "A Big Welcome !!",
        },
      },
    },
    // assets: {
    // styles: ["/styles.css"],
    // },
  })
  admin.watch()
  const ConnectSession = Connect(session)
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: "postgres://adminjs:changeme@localhost:5432/adminjs",
      ssl: process.env.NODE_ENV === "production",
    },
    tableName: "session",
    createTableIfMissing: true,
  })
  const authProvider = new DefaultAuthProvider({
    componentLoader,
    authenticate,
  })
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      // authenticate,
      provider: authProvider,
      cookieName: "adminjs",
      cookiePassword: "sessionsecret",
    },
    mFetch, // Custom Routers
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: "sessionsecret",
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      },
      name: "adminjs",
    }
  )
  app.use(cors())
  app.use(bodyparser.json())
  app.use(express.static(path.join(__dirname, "./public")))
  app.use(admin.options.rootPath, adminRouter)
  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    )
  })
}

start()
