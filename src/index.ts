import { LitElement, css, property, customElement, query, html } from 'lit-element';

@customElement('lit-circle-percent')
export class LitCirclePercent extends LitElement{
    static styles = css`
    :host{
        display: block;
    }
    .circle{
        stroke-width: 48;
    }
    canvas{
        display: block;
    }
    `;    
    static get properties(){
        return {
            percent: {type: Number}
        }
    }
    _percent: number = 0;
    get percent(){
        return this._percent;
    }
    set percent(value: number){
        this._percent = value;
        this.renderCircle();
    }

    @property({type: Number, attribute: true}) ratio: number = 3;
    @property({type: Number, attribute: true}) width: number = 14;
    @property({type: Number, attribute: true}) height: number = 14;
    @query('canvas') canvas!: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null = null;
    setAttribute(name: string, value: string){
        super.setAttribute(name, value);
        if(name === "class"){
            this.renderCircle();
        }
    }
    async connectedCallback(){
        super.connectedCallback();
        await this.updateComplete
        this.init();
        this.renderCircle();
    }
    disconnectedCallback(){
        this.ctx = null;
        super.disconnectedCallback();
    }
    init(){
        this.ctx = this.canvas.getContext('2d')!;
        this.ctx.canvas.height = this.height * this.ratio;
        this.ctx.canvas.width = this.width * this.ratio;
        this.ctx.translate(this.radius, this.radius);
        this.ctx.lineWidth = this.lineWidth;
    }
    get lineWidth() {
        return 1 * this.ratio;
    }
    get radius(){
        return this.width * this.ratio / 2;
    }
    getColor(): string{
        const styles = window.getComputedStyle(this.canvas);
        const color = styles.getPropertyValue("--circle-color");        
        return color || "#cccccc"; 
    }
    renderCircle(){
        if(!this.ctx) return;
        const color = this.getColor();
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.clearRect(-this.radius, -this.radius, this.radius * 2, this.radius * 2);    
        this.ctx.lineWidth = 0;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -this.radius);
        this.ctx.arc(0, 0,
            this.radius - this.lineWidth - 1, 
            -Math.PI / 2,
            (this.percent / 100) * 2 * Math.PI - Math.PI / 2
        );
        this.ctx.lineTo(0, 0);
        this.ctx.fill();
            
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.radius - this.lineWidth - 1, 0, 2 * Math.PI);
        this.ctx.stroke();
    }
    render(){
        return html`<canvas style = "width: ${this.width}px; height: ${this.height}px;"></canvas>`;
    }
}

