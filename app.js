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
import prisma from "./_db.js"
import * as url from "url"
import path from "path"
import mRouter from "./routers/mRouter.js"
import cors from "cors"
import bodyparser from "body-parser"
import uploadFeature from "@adminjs/upload"
import loggerFeature, { createLoggerResource } from "@adminjs/logger"
import importExportFeature from "@adminjs/import-export"
import {
  owningRelationSettingsFeature,
  targetRelationSettingsFeature,
} from "@adminjs/relations"
import argon2 from "argon2"
import passwordsFeature from "@adminjs/passwords"
import leafletFeatures, { getLeafletDist } from "@adminjs/leaflet"

BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString())
  return int ?? this.toString()
}

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
        resource: { model: getModelByName("markers"), client: prisma },
        // options: {
        //   id: "markers",
        // },
      },
      {
        resource: { model: getModelByName("maps"), client: prisma },
        features: [
          leafletFeatures.leafletMultipleMarkersMapFeature({
            /* You must provide your "componentLoader" instance for the feature
            to add it's components. */
            componentLoader,
            /* Since Map and Marker are in 1:M relation, a property to display the map
            will not be present by default and the feature has to create one.
            In this example, "mapProperty" creates a new "markers" field in your Map's "edit"
            and "show" views. */
            mapProperty: "iata markers",
            /* "markerOptions" are required for the feature to know where to get and how to manage
            your markers. Please note that "edit", "new" and "list" actions have to be enabled in your
            Marker resource. */
            markerOptions: {
              /* Your marker's resource ID. This is usually either the model name or a table name
              of your Marker unless you'd changed it. */
              resourceId: "markers",
              /* The foreign key in your Marker model which associates it with currently managed Map */
              foreignKey: "maps", //weird...it is not "map_id", maybe use prisma and typeorm to generate
              /* This configuration is exactly the same as "paths" configuration
              in "leafletSingleMarkerMapFeature" */
              paths: {
                /* A property which should be used to display the map. It can be an entirely
                new property name, or you can use an actual field from your Marker's model. */
                mapProperty: "mLocation",
                /* "jsonProperty" is optional and should only be given if your Marker's latitude
                and longitude are stored in a single JSON field. In this example, "location"
                is of GeoJSON.Point type (https://geojson.org/). If your latitude and longitude
                are stored in separate fields, leave this option undefined. */
                jsonProperty: "location", // Postgres workroud: create a field which converts geometry type to json type!
                /* If your latitude has a separate field in your model, just use the field name.
                Example:
                  latitudeProperty: 'latitude'
                If your latitude property is a part of a JSON structure (GeoJSON example from above)
                you must provide a flattened path under which the latitude should be saved in the JSON. */
                latitudeProperty: "location.coordinates.0",
                /* Longitude configuration is the same as latitude's */
                longitudeProperty: "location.coordinates.1",
                /* 'location.coordinates.0' combined with 'location.coordinates.1' will save the
                coordinates in the following format: { coordinates: [<lat>, <lng>] } */
              },
            },
            /* "mapProps" are passed to React Leaflet's MapContainer component. You can use them to
            change initial zoom, initial coordinates, max zoom, map bounds, disable scroll zoom, etc.
            Reference: https://react-leaflet.js.org/docs/v3/api-map/ */
            mapProps: {
              /* In "leafletSingleMarkerMapFeature" the map is centered at your marker by default.
              In "leafletMultipleMarkersMapFeature" the markers are fetched asynchronously and the map
              is rendered before they're available so you must provide initial coordinates yourself.
              By default, if you don't provide "center", the map will be centered at London coordinates.

              Future versions of "@adminjs/leaflet" should have better handling of initial coordinates. */
              center: [52.237049, 21.017532],
            },
            /* "tileProps" are passed to React Leaflet's TileLayer component. You can use them
            to provide your custom tile URL, attribution, etc.
            Reference: https://react-leaflet.js.org/docs/v3/api-components/#tilelayer */
            tileProps: undefined,
          }),
        ],
      },
      {
        resource: { model: getModelByName("User"), client: prisma },
        options: {
          //...your regular options go here'
          properties: { password: { isVisible: false } },
        },
        features: [
          passwordsFeature({
            componentLoader,
            properties: {
              encryptedPassword: "password",
              password: "newPassword",
            },
            hash: argon2.hash,
          }),
        ],
      },
      {
        resource: { model: getModelByName("supplier"), client: prisma },
        options: { id: "supplier", titleProperty: "company" }, // Feature Log use titleProperty to show field "Record Title"
        features: [
          // loggerFeature({ // Put loggerFeature here if wants to audit 'supplier' resource
          //   componentLoader,
          //   propertiesMapping: {
          //     user: "userId", // Save authenticate func's return obj's id value(have to enable authorization before using this feature) to Entity Log's userId field which holds reference to user who made changes
          //   },
          //   userIdAttribute: "id", //primary key currently logged user
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
          listProperties: [
            "name",
            "from",
            "stop",
            "to",
            "airline",
            "effective_date",
          ],
          properties: {
            ratesArr: { isArray: true, isDraggable: false, type: "mixed" },
            "ratesArr.ratio": {
              type: "string", // PostgreSQL text; number for ostgreSQL numeric
            },
            "ratesArr.type": {
              type: "string",
            },
            "ratesArr.r45": {
              type: "string",
            },
            "ratesArr.r100": {
              type: "string",
            },
            "ratesArr.r300": {
              type: "string",
            },
            "ratesArr.r500": {
              type: "string",
            },
            "ratesArr.r1000": {
              type: "string",
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
        ...createLoggerResource({
          componentLoader: componentLoader,
          resource: { model: getModelByName("Log"), client: prisma },
          featureOptions: {
            propertiesMapping: {
              user: "userId", // Mandatory, user is field of Frontend UI, userId is field of Entity Log
            },
            resourceOptions: {
              navigation: {
                name: "Audit",
                //https://storybook.adminjs.co/?path=/docs/designsystem-atoms-icon--docs
                icon: "Target",
              },
            },
          },
        }),
        features: [targetRelationSettingsFeature()],
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
    // https://github.com/SoftwareBrothers/adminjs/blob/master/src/locale/en/translation.json
    locale: {
      language: "en", // Default
      localeDetection: true,
      // withBackend: true,
      debug: false, // Disable console.log warnings
    },
    assets: {
      styles: ["/leaflet.css"],
    },
  })

  const ConnectSession = Connect(session)
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: "postgres://adminjs:changeme@localhost:5432/adminjs",
      // connectionString: "postgres://adminjs:Cocktail1007@pgm-uf6u905h6ky30pf6xo.pg.rds.aliyuncs.com/adminjs?schema=public",
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
    mRouter, //! Custom Routers
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
  admin.watch() // watch for changes via AdminJS.bundle() method AND only for development mode
  app.use(bodyparser.json()) // bodyparser only for POST request
  // prettier-ignore
  app.use(bodyparser.text({type: "text/plain"}))
  app.use(cors())
  app.use(express.static(getLeafletDist()))
  // app.use(express.static(path.join(__dirname, "./public")))
  app.use(admin.options.rootPath, adminRouter)
  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    )
  })
}

start()
