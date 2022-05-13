export type toPascal<InputType> =
    InputType extends (infer ArrayGenericType)[] ? toPascal<ArrayGenericType>[]
    : InputType extends object ? ObjectToPascal<InputType>
    : InputType

type ObjectToPascal<InputType> = InputType extends object ? {
    [S in keyof InputType as SnakeToCamelCase<S & string>]: toPascal<InputType[S]>
} : InputType

type SnakeToCamelCase<S extends string> =
    S extends `${infer T}_${infer U}` ?
    `${T}${Capitalize<SnakeToCamelCase<U>>}` :
    S

