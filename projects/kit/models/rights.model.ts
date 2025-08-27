export enum RbacStaticType {
    /**
     * object or action
     * objId format: object:name
     */
    OBJECT = 'OBJECT',
    /**
     * HTTP endpoint rights
     * objId format: endpoint:name
     */
    ENDPOINT = 'ENDPOINT',
    /**
     * LOCATION rights
     * objId format: location:matching
     */
    LOCATION = 'LOCATION'
}

export type RbacType = RbacStaticType | string;

export type RbacObjectId  =
    'User' | string;

/**
 * Base set of secured actions.
 * You can use any string identifier as a secured action without even adding it to this list.
 */
export type RbacAction =
    'read' | 'write' | 'create' | 'delete' | 'administration' | 'execute' | 'activate' | 'deactivate' | 'changeStatus' | 'view' | 'modify'  // domain-specific actions
    | 'httpGet' | 'httpHead' | 'httpPost' | 'httpPut' | 'httpDelete' // http methods
    | 'allow' | 'prevent' // URL actions
    | string;


export interface AuthorityPermissions {
    [key: string]: boolean;
}


