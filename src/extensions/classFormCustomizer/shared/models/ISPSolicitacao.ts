export interface ISPSolicitacao {
   Id: number;
   Title: string;
   MarcaId: number;
   ModeloId: number;
   CarroId: number;
   Placa: number;
   DataEntrada: string | number;
   DataSaida: string | number;
   SolicitacaoComentario: string | null;
}