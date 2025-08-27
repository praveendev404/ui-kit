import {
    externalSchematic,
    Rule,
    chain,
    SchematicContext,
    Tree
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
    addPackageJsonDependency,
    NodeDependencyType
} from '@schematics/angular/utility/dependencies';

function updateFederation(name: string): Rule {
    return (tree: Tree) => {
        tree.create('.prettierrc', `{
    "useTabs": false,
    "printWidth": 140,
    "tabWidth": 4,
    "singleQuote": true,
    "trailingComma": "es5",
    "semi": true,
    "arrowParens": "avoid"
}
`)
        tree.overwrite(
            'federation.config.js',
            `const {
  withNativeFederation,
  shareAll,
  share,
} = require("@angular-architects/native-federation/config");

module.exports = withNativeFederation({
  name: "${name}",

  exposes: {
    './Component': './src/app/app.component.ts',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: false,
      requiredVersion: "auto",
    }),
    ...share({
      "@fortawesome/angular-fontawesome": { singleton: true, strictVersion: false, requiredVersion: "0.10.2" },
      "@angular/cdk": { singleton: true, strictVersion: false, requiredVersion: "^13.3.9", includeSecondaries: false },
      "@angular/cdk/a11y": { singleton: true, strictVersion: false, requiredVersion: "^13.3.9", includeSecondaries: false },
      "@angular/cdk/accordion": { singleton: true, strictVersion: false, requiredVersion: "^13.3.9", includeSecondaries: false },
      "@angular/cdk/bidi": { singleton: true, strictVersion: false, requiredVersion: "^13.3.9", includeSecondaries: false },
      "@angular/cdk/clipboard": { singleton: true, strictVersion: false, requiredVersion: "^13.3.9", includeSecondaries: false },
      "@angular/cdk/coercion": { singleton: true, strictVersion: false, requiredVersion: "^13.3.9", includeSecondaries: false },
      "@angular/cdk/collections": { singleton: true, strictVersion: false, requiredVersion: "^13.3.9", includeSecondaries: false },
      "@angular/cdk/drag-drop": { singleton: true, strictVersion: false, requiredVersion: "^13.3.9", includeSecondaries: false },
      "@angular/cdk/keycodes": { singleton: true, strictVersion: false, requiredVersion: "^13.3.9", includeSecondaries: false },
      "@angular/cdk/layout": { singleton: true, strictVersion: false, requiredVersion: "^13.3.9", includeSecondaries: false },
      "@angular/cdk/observers": { singleton: true, strictVersion: false, requiredVersion: "^13.3.9", includeSecondaries: false },
      "@angular/cdk/overlay": { singleton: true, strictVersion: false, requiredVersion: "^13.3.9", includeSecondaries: false },
      "@angular/cdk/platform": { singleton: true, strictVersion: false, requiredVersion: "^13.3.9", includeSecondaries: false },
      "@angular/cdk/portal": { singleton: true, strictVersion: false, requiredVersion: "^13.3.9", includeSecondaries: false },
      "@angular/cdk/scrolling": { singleton: true, strictVersion: false, requiredVersion: "^13.3.9", includeSecondaries: false },
      "@angular/cdk/stepper": { singleton: true, strictVersion: false, requiredVersion: "^13.3.9", includeSecondaries: false },
      "@angular/cdk/table": { singleton: true, strictVersion: false, requiredVersion: "^13.3.9", includeSecondaries: false },
      "@angular/cdk/text-field": { singleton: true, strictVersion: false, requiredVersion: "^13.3.9", includeSecondaries: false },
      "@angular/cdk/tree": { singleton: true, strictVersion: false, requiredVersion: "^13.3.9", includeSecondaries: false },
      "@dagility-ui/kit": { singleton: true, strictVersion: false, requiredVersion: "^17.0.190", includeSecondaries: false },
      "@dagility-ui/kit/auth": { singleton: true, strictVersion: false, requiredVersion: "^17.0.190", includeSecondaries: false },
      "@dagility-ui/kit/icons": { singleton: true, strictVersion: false, requiredVersion: "^17.0.190", includeSecondaries: false },
      "@dagility-ui/kit/toastr": { singleton: true, strictVersion: false, requiredVersion: "^17.0.190", includeSecondaries: false }
    }),
  },

  skip: [
    "rxjs/ajax",
    "rxjs/fetch",
    "rxjs/testing",
    "rxjs/webSocket",
    // Add further packages you don't need at runtime
  ],

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0
});
`
        );

        tree.overwrite(
            'src/main.ts',
            `import { initFederation } from '@angular-architects/native-federation';

import { environment } from './environment';

import Keycloak from 'keycloak-js';
import type { Env } from '@dagility-ui/kit/auth';

export async function login(env: Env) {
  const instance = new Keycloak(env.keycloakParams);
  instance.clearToken();
  await instance.init({
    onLoad: 'login-required',
    checkLoginIframe: !!env.production,
    redirectUri: location.href,
  });

  return instance;
}

(async () => {
  const keycloak = await login(environment);

  try {
    await initFederation();
    const { bootstrap } = await import('./bootstrap');
    bootstrap(keycloak);
  } catch (err) {
    console.error(err);
  }
})();
`
        );

        tree.create(
            'src/environment.ts',
            `import type { Env } from '@dagility-ui/kit/auth';

const service_url = 'https://dev.ustpace.com';
export const environment: Env = {
  production: false,
  serviceUrl: service_url,
  adminURL: \`\${service_url}/admin\`,
  adminApiURL: \`\${service_url}/admin/api\`,
  keycloakParams: {
    enable: true,
    url: 'https://keycloak.ustpace.com/auth',
    realm: 'Edgeops-Dev',
    clientId: 'Edgeops-ui',
    'ssl-required': 'external',
    'public-client': true,
  },
};

export { Env };`
        );

        tree.overwrite(
            'src/bootstrap.ts',
            `import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import Keycloak from 'keycloak-js';
import { environment } from './environment';
import { provideAuthInterceptor } from '@dagility-ui/kit/auth';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptorsFromDi, withXsrfConfiguration } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

export function bootstrap(keycloak: Keycloak) {
  bootstrapApplication(AppComponent, {
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      {
        provide: 'environment',
        useValue: environment,
      },
      provideHttpClient(
        withInterceptorsFromDi(),
        withXsrfConfiguration({
          cookieName: 'XSRF-TOKEN',
          headerName: 'X-XSRF-TOKEN',
        }),
      ),
      provideAuthInterceptor({
        getTokenApi: () => keycloak.token || '',
      }),
    ],
  }).catch((err) => console.error(err));
}
`
        );

        tree.delete('src/app/app.config.ts');
        tree.overwrite('src/app/app.component.html', `<h2>Welcome to {{ title }}</h2>`);
        tree.overwrite('src/app/app.component.ts', `import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '${name}';
}

export default AppComponent;`);
        tree.overwrite('src/styles.scss', '@import "@dagility-ui/kit";');
    };
}

export function generateMfe(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.logger.info(
            'Generate mfe Schematic: ' + JSON.stringify(options)
        );

        context.addTask(new NodePackageInstallTask());

        addPackageJsonDependency(tree, {
            type: NodeDependencyType.Dev,
            name: 'patch-package',
            version: '^8.0.0'
        });

        tree.create(
            '.npmrc',
            `engine-strict=true
@dagility-ui:registry=https://registry.ustpace.com/repository/npm-s3/
legacy-peer-deps=true`
        );
        addPackageJsonDependency(tree, {
            type: NodeDependencyType.Dev,
            name: 'prettier',
            version: '3.1.1'
        });
        addPackageJsonDependency(tree, {
            type: NodeDependencyType.Default,
            name: '@dagility-ui/kit',
            version: '17.0.190'
        });
        addPackageJsonDependency(tree, {
            type: NodeDependencyType.Default,
            name: '@ng-bootstrap/ng-bootstrap',
            version: '11.0.1'
        });
        addPackageJsonDependency(tree, {
            type: NodeDependencyType.Default,
            name: '@ng-select/ng-select',
            version: '10.0.4'
        });
        addPackageJsonDependency(tree, {
            type: NodeDependencyType.Default,
            name: 'perfect-scrollbar',
            version: '1.5.5'
        });
        addPackageJsonDependency(tree, {
            type: NodeDependencyType.Default,
            name: 'perfect-scrollbar-angular',
            version: '13.0.1'
        });

        tree.create('patches/@softarc+native-federation+2.0.10.patch', `diff --git a/node_modules/@softarc/native-federation/src/lib/core/bundle-exposed-and-mappings.js b/node_modules/@softarc/native-federation/src/lib/core/bundle-exposed-and-mappings.js
index 15c4a90..bb8e2f0 100644
--- a/node_modules/@softarc/native-federation/src/lib/core/bundle-exposed-and-mappings.js
+++ b/node_modules/@softarc/native-federation/src/lib/core/bundle-exposed-and-mappings.js
@@ -25,6 +25,9 @@ function bundleExposedAndMappings(config, fedOptions, externals) {
         const entryPoints = [...shared, ...exposes];
         const hash = !fedOptions.dev;
         logger_1.logger.info('Building federation artefacts');
+        if (!entryPoints.length) {
+            return { mappings: [], exposes: [] };
+        }
         const result = yield (0, build_utils_1.bundle)({
             entryPoints,
             outdir: fedOptions.outputPath,
diff --git a/node_modules/@softarc/native-federation/src/lib/core/bundle-shared.js b/node_modules/@softarc/native-federation/src/lib/core/bundle-shared.js
index 88a1667..12a4802 100644
--- a/node_modules/@softarc/native-federation/src/lib/core/bundle-shared.js
+++ b/node_modules/@softarc/native-federation/src/lib/core/bundle-shared.js
@@ -42,16 +42,18 @@ function bundleShared(config, fedOptions, externals) {
             logger_1.logger.notice("Skip packages you don't want to share in your federation config");
         }
         try {
-            yield (0, build_utils_1.bundle)({
-                entryPoints,
-                tsConfigPath: fedOptions.tsConfig,
-                external: externals,
-                outdir: cachePath,
-                mappedPaths: config.sharedMappings,
-                dev: fedOptions.dev,
-                kind: 'shared-package',
-                hash: false,
-            });
+            if (entryPoints.length) {
+                yield (0, build_utils_1.bundle)({
+                    entryPoints,
+                    tsConfigPath: fedOptions.tsConfig,
+                    external: externals,
+                    outdir: cachePath,
+                    mappedPaths: config.sharedMappings,
+                    dev: fedOptions.dev,
+                    kind: 'shared-package',
+                    hash: false,
+                });
+            }
             for (const fileName of exptedResults) {
                 const outFileName = path.basename(fileName);
                 const cachedFile = path.join(cachePath, outFileName);
`);
        tree.create('patches/@softarc+native-federation-runtime+2.0.10.patch', `diff --git a/node_modules/@softarc/native-federation-runtime/fesm2022/softarc-native-federation-runtime.mjs b/node_modules/@softarc/native-federation-runtime/fesm2022/softarc-native-federation-runtime.mjs
index ae230e4..a0ff333 100644
--- a/node_modules/@softarc/native-federation-runtime/fesm2022/softarc-native-federation-runtime.mjs
+++ b/node_modules/@softarc/native-federation-runtime/fesm2022/softarc-native-federation-runtime.mjs
@@ -1,3 +1,4 @@
+import { satisfies } from 'semver';
 function mergeImportMaps(map1, map2) {
     return {
         imports: { ...map1.imports, ...map2.imports },
@@ -9,14 +10,29 @@ const nfNamespace = '__NATIVE_FEDERATION__';
 const global = globalThis;
 global[nfNamespace] ??= {
     externals: new Map(),
+    externalsMap: new Map(),
     remoteNamesToRemote: new Map(),
     baseUrlToRemoteNames: new Map(),
 };
 const globalCache = global[nfNamespace];

 const externals = globalCache.externals;
+const externalsMap = globalCache.externalsMap;
+
+function getHostVersion(shared) {
+  if (!externalsMap.has(shared.packageName)) {
+    return;
+  }
+
+  const hostPackage = externalsMap.get(shared.packageName);
+  if (satisfies(shared.version, hostPackage.requiredVersion)) {
+    return hostPackage;
+  }
+}
+
 function getExternalKey(shared) {
-    return \`\${shared.packageName}@\${shared.version}\`;
+    const pkg = getHostVersion(shared) || shared;
+    return \`\${pkg.packageName}@\${pkg.version}\`;
 }
 function getExternalUrl(shared) {
     const packageKey = getExternalKey(shared);
@@ -25,6 +41,9 @@ function getExternalUrl(shared) {
 function setExternalUrl(shared, url) {
     const packageKey = getExternalKey(shared);
     externals.set(packageKey, url);
+    if(!externalsMap.has(shared.packageName)) {
+        externalsMap.set(shared.packageName, shared);
+    }
 }

 function getDirectory(url) {
`);

        const packageJson = tree.readJson('package.json') as any;
        packageJson['scripts'] = {
            ...packageJson['scripts'],
            ['postinstall']: 'patch-package'
        };
        tree.overwrite('package.json', JSON.stringify(packageJson, null, 2));

        return chain([
            externalSchematic(
                '@angular-architects/native-federation',
                'ng-add',
                {
                    project: options.name,
                    port: 4201,
                    type: 'remote'
                }
            ),
            updateFederation(options.name)
        ]);
    };
}
