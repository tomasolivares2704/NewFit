export interface Antropometricos {
    id:string,
    estatura:string,
    peso:string,
    edad: number,
    sexo: string[],
}

export interface Nivel {
    principiante: string,
    intermedio: string,
    avanzado: string,
    
}

export interface Objetivo {
    disminuir: string,
}

export interface Sexo {
    masculino: string,
    femenino: string,
}
