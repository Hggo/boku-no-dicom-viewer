import Instance from "../../model/Instance";
import { CanvasImageData } from "../../model/CanvasImageData";

export class DrawCanvas {

    public static drawAnnotations(ctx: CanvasRenderingContext2D, instance: Instance) {

        ctx.font = "12px Arial";
        ctx.fillStyle = "yellow";
        ctx.fillText("WW", instance.cols - 70, instance.rows - 60);
        ctx.fillText(instance.ww.toString(), instance.cols - 45, instance.rows - 60);

        ctx.fillText("WC", instance.cols - 70, instance.rows - 50);
        ctx.fillText(instance.wc.toString(), instance.cols - 45, instance.rows - 50);
    }

    public static drawPixelData(ctx: CanvasRenderingContext2D, instance: Instance) {
        let imddt = new CanvasImageData(instance, ctx);
        ctx.putImageData(imddt.imageData, 0, 0);
    }

    public static initCanvas(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement){
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}