namespace Clases{

export abstract class Animal{


    public toJSON():string{
        let json: string = `{"nombre":"${this.nombre}", "edad":${this.edad},"patas":${this.patas}}`;
        return json;
    }

}

}