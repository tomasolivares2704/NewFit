export interface antropometricos {
    id:string,
    estatura:string,
    peso:string,
    niveles: Nivel[]
    objetivos: Objetivo[]
}

export interface Nivel {
    principiante: string,
    intermedio: string,
    avanzado: string,
    
}

export interface Objetivo {
    disminuir: string,
}

