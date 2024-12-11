declare module 'js-cookie' {
    export function set(name: string, value: string | number, options?: any): string;
    export function get(name: string): string | undefined;
    export function remove(name: string, options?: any): void;
}
