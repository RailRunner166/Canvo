import BasicColor from '../Enums/BasicColor';
import Width from '../Enums/Width';
import ICoordinates from '../Interfaces/ICoordinates';
import ILineOptions from '../Interfaces/ILineOptions';

/**
 * A line
 */
class Line {
	/**
	 * The `A` point of the line
	 */
	public pointA: ICoordinates;

	/**
	 * The `B` point of the line
	 */
	public pointB: ICoordinates;

	/**
	 * The color of the line
	 */
	public color: string;

	/**
	 * The width of the line
	 */
	public width: number;

	/**
	 * The radius of the line handles
	 */
	private handlesRadius: number = 15;

	/**
	 * Create a new Line
	 * @param {ILineOptions} options Options to create the line with
	 * @param {ICoordinates} options.pointA The line's initial `A` point
	 * @param {ICoordinates} options.pointB The line's initial `B` point
	 * @param {string} [options.color] The line's initial color
	 * @param {number} [options.width] The line's initial width
	 */
	constructor(options: ILineOptions) {
		this.pointA = options.pointA;
		this.pointB = options.pointB;
		this.color = options.color || BasicColor.BLACK;
		this.width = options.width || Width.MD;
	}

	/**
	 * Set the line's `A` point
	 * @param {ICoordinates} newCoords The new coordinates for the line's point A
	 * @returns {void}
	 */
	public setPointA(newCoords: ICoordinates): void {
		this.pointA = newCoords;
	}

	/**
	 * Set the line's `B` point
	 * @param {ICoordinates} newCoords The new coordinates for the line's point B
	 * @returns {void}
	 */
	public setPointB(newCoords: ICoordinates): void {
		this.pointB = newCoords;
	}

	/**
	 * Draw the line on a canvas using a CanvasRenderingContext2D
	 * @param {CanvasRenderingContext2D} ctx The context to render the line with
	 * @returns {void}
	 */
	public draw(ctx: CanvasRenderingContext2D): void {
		ctx.beginPath();
		ctx.moveTo(this.pointA.x, this.pointA.y);
		ctx.lineTo(this.pointB.x, this.pointB.y);
		ctx.strokeStyle = this.color || BasicColor.BLACK;
		ctx.lineWidth = this.width || 1;
		ctx.stroke();
		ctx.moveTo(this.pointA.x, this.pointA.y);
	}

	/**
	 * Initialise events for the editor
	 * @param {CanvasRenderingContext2D} ctx The context to render event driven objects with
	 * @param {HTMLCanvasElement} canvas The canvas element to attach events to
	 * @returns {void}
	 */
	public initEditorEvents(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
		canvas.addEventListener('click', (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			const clickCoords: ICoordinates = {
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			};

			if (Math.sqrt(
				(clickCoords.x - this.pointA.x) *
				(clickCoords.x - this.pointA.x) +
				(clickCoords.y - this.pointA.y) *
				(clickCoords.y - this.pointA.y),
			) <= this.handlesRadius) {
				this.handlesRadius = 10;
			} else if (Math.sqrt(
				(clickCoords.x - this.pointB.x) *
				(clickCoords.x - this.pointB.x) +
				(clickCoords.y - this.pointB.y) *
				(clickCoords.y - this.pointB.y),
			) <= this.handlesRadius) {
				this.handlesRadius = 10;
			}
		});
	}
}

export default Line;
