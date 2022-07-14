export namespace Logger {
  type Color =
    | "Red"
    | "Green"
    | "Yellow"
    | "Blue"
    | "Magenta"
    | "Cyan"
    | "White";

  const reset = "\x1b[0m";

  const colors: Record<Color, string> = {
    Red: "\x1b[31m",
    Green: "\x1b[32m",
    Yellow: "\x1b[33m",
    Blue: "\x1b[34m",
    Magenta: "\x1b[35m",
    Cyan: "\x1b[36m",
    White: "\x1b[37m",
  };

  type ILogger = (...args: any[]) => void;

  function getTime() {
    const now = new Date();

    return now.toTimeString().slice(0, 8) + "." + now.getMilliseconds().toString().padEnd(3, '');
  }

  function getStackTrace(stackSubstringFrom: string) {
    try {
      throw new Error();
    } catch (error) {
      const line =
        (error as Error).stack
          ?.split("\n")[3]
          .trim()
          .substring(3) || "";

      return "    at (" + line.substring(line.indexOf(stackSubstringFrom));
    }
  }

  export function getLogger(prefix: string, color: Color, stackSubstringFrom?: string): ILogger {
    const paint = colors[color];

    return (...args) => {
        console.log(paint, getTime(), `[${prefix}]  `, ...args);
        if(stackSubstringFrom) console.log(getStackTrace(stackSubstringFrom), reset);
    };
  }
}
