import { LightningElement, track } from 'lwc';
import criarOportunidade from '@salesforce/apex/MinhaClasse.criarOportunidade';

export default class CriarOportunidade extends LightningElement {
    @track nome;
    @track fase;
    @track tipo;
    @track valor;
    @track dataFechamento;

    fasesOptions = [
        { label: 'Prospectando', value: 'Prospectando' },
        { label: 'Qualificação', value: 'Qualificação' },
        { label: 'Proposta enviada', value: 'Proposta enviada' },
        { label: 'Negociação', value: 'Negociação' },
        { label: 'Fechado ganho', value: 'Fechado ganho' },
        { label: 'Fechado perdido', value: 'Fechado perdido' }
    ];

    handleNomeChange(event) {
        this.nome = event.target.value;
    }

    handleFaseChange(event) {
        this.fase = event.target.value;
    }

    handleTipoChange(event) {
        this.tipo = event.target.value;
    }

    handleValorChange(event) {
        this.valor = event.target.value;
    }

    handleDataFechamentoChange(event) {
        this.dataFechamento = event.target.value;
    }

    handleSave() {
        if (!this.nome || !this.fase || !this.tipo || !this.valor || !this.dataFechamento) {
            alert('Todos os campos são obrigatórios.');
            return;
        }

        criarOportunidade({
            nome: this.nome,
            fase: this.fase,
            tipo: this.tipo,
            valor: this.valor,
            dataFechamento: this.dataFechamento
        })
            .then(() => {
                this.nome = '';
                this.fase = '';
                this.tipo = '';
                this.valor = '';
                this.dataFechamento = '';
                alert('Oportunidade criada com sucesso!');
            })
            .catch(error => {
                console.error(error);
            });
    }
}
