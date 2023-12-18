class CountdownTimer {

    private timerId: number | null = null;
    private readonly duration: number;
    private startTime: number | null = null;
    private remainingTime: number;
  
    constructor(duration: number) {
        this.duration = duration;
        this.remainingTime = duration;
    }
  
    start(callback: () => void): void {
        if (this.timerId === null) {
            this.timerId = window.setTimeout(() => {
                callback();
                this.timerId = null;
            }, this.duration);
        }
    }

    stop(): void {
        if (this.timerId !== null) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
    }
  
    pause(): void {
        if (this.timerId !== null) {
            clearTimeout(this.timerId);
            const elapsed = (new Date()).getTime() - (this.startTime || (new Date()).getTime());
            this.remainingTime -= elapsed;
            this.timerId = null;
            this.startTime = null;
            console.log('Timer paused.');
        }
    }
  
    resume(callback: () => void): void {
        if (this.timerId === null) {
            this.startTime = (new Date()).getTime();
            this.timerId = window.setTimeout(() => {
                callback();
                this.timerId = null;
            }, this.remainingTime);
        }
    }
  }