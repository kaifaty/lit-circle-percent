import { LitElement, svg, css, property, customElement } from 'lit-element';

@customElement('lit-circle-percent')
export class LitCirclePercent extends LitElement{
    static styles = css`
    :host{
        display: block;
        width: var(--percent-size, 13px);
        height: var(--percent-size, 13px);
    }
    :host(.b) svg{
        stroke: var(--circle-buy-color, green);
    }
    :host(.s) svg{
        stroke: var(--circle-sell-color, red);
    }
    svg {
        transform: rotate(-90deg);
        transition: all 1s ease-in-out;
        fill: none;
        stroke: var(--percent-color, #fff);
        width: var(--percent-size, 13px);
        height: var(--percent-size, 13px);
        stroke-width: 8;
        border: none;
    }
    .circle{
        stroke-width: 48;
    }
    `;
    radius: number = 24;
    @property({type: Number, attribute: true}) percent: number = 0;
    calcRadius(){
        return Math.round(this.radius * 2 * Math.PI * this.percent / 100);
    }
    render(){
        return svg`<svg viewbox="0 0 100 100">
                        <circle class = "circle" cx="50" cy="50" r="${this.radius}" 
                                stroke-dasharray = "${this.calcRadius()} 999"/>  
                        <circle cx="50" cy="50" r="46" /> 
                    </svg>`;
    }
}