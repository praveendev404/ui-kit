import {
    externalSchematic,
    Rule,
    SchematicContext,
    Tree
} from '@angular-devkit/schematics';
import {
    NodePackageInstallTask,
    RunSchematicTask
} from '@angular-devkit/schematics/tasks';

export function installNf(options: any): Rule {
    return (_tree: Tree, context: SchematicContext) => {
        context.logger.info('My Schematic: ' + JSON.stringify(options));
        const installTaskId = context.addTask(
            new NodePackageInstallTask({
                packageName: '@angular-architects/native-federation@18.2.2'
            })
        );
        context.addTask(
            new RunSchematicTask('generate-micro-frontend', options),
            [installTaskId]
        );

        return externalSchematic('@schematics/angular', 'ng-new', {
            name: options.name,
            directory: './',
            style: 'scss',
            ssr: false
        });
    };
}
