import { LitElement, css, property, customElement, query, html } from 'lit-element';

@customElement('lit-circle-percent')
export class LitCirclePercent extends LitElement{
    static styles = css`
    :host{
        display: block;
        height: var(--percent-size, 14px);
        width: var(--percent-size, 14px);
    }
    canvas{
        width: 100%;
        height: 100%;
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

    @property({type: Number, attribute: true}) ratio: number = 2;
    @property({type: Number, attribute: true}) size: number = 14;
    @query('canvas') canvas!: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null = null;
    setAttribute(name: string, value: string){
        super.setAttribute(name, value);
        if(name === "class"){
            this.renderCircle();
        }
    }
    firstUpdate(){
        this.init();
        this.renderCircle();
    }
    init(){
        this.ctx = this.canvas.getContext('2d')!;
        this.ctx.canvas.height = this.size * this.ratio;
        this.ctx.canvas.width = this.size * this.ratio;
        this.ctx.translate(this.radius, this.radius);
        this.ctx.lineWidth = this.lineWidth;
    }
    get lineWidth() {
        return 1 * this.ratio;
    }
    get radius(){
        return this.size * this.ratio / 2 ;
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
            this.radius - this.lineWidth - this.ratio, 
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
        return html`<canvas></canvas>`;
    }
}

