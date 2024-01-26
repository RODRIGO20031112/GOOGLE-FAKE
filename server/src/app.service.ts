import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  MongoClient,
  Collection,
  OptionalId,
  Document,
  MongoClientOptions as MongoOptions,
} from 'mongodb';

interface MongoClientOptions extends MongoOptions {}

@Injectable()
export class AppService {
  private client: MongoClient;
  private db: any;
  private collection: Collection<Document>;

  constructor() {
    const mongoOptions: MongoClientOptions = {};
    this.client = new MongoClient('mongodb://127.0.0.1:27017', mongoOptions);
  }

  async simularPesquisa(parametrosPesquisa) {
    const { palavrasChave, localidade, frequencia } = parametrosPesquisa;

    try {
      await this.client.connect();
      this.db = this.client.db('local');
      this.collection = this.db.collection('resultados');

      const response = await axios.post(
        `http://localhost:5050/pesquisa?palavraChave=${palavrasChave}&localidade=${localidade}&frequencia=${frequencia}`,
      );

      const resultados: OptionalId<Document>[] = [
        { resultado: response.data }, // Extrai apenas o conteúdo da resposta
      ];

      await this.collection.insertMany(resultados);

      return resultados.map((result) => result.resultado);
    } catch (error) {
      console.error('Erro ao simular pesquisa ou conectar ao MongoDB:', error);
      throw new Error('Falha na simulação de pesquisa');
    } finally {
      await this.client.close();
    }
  }
}
