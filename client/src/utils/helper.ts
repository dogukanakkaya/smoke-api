type EnumType = { [s: number]: string }

export const enumToMap = (enumerable: EnumType): Map<string | number, string> => {
    return new Map(Object.entries(enumerable).map(([key, value]) => [key, value]))
}