export const stripBeginSpace = (s: string): string => {
  if (s[0] === " ") {
    return s.substring(1);
  } else {
    return s;
  }
};

export const stripEndSpace = (s: string): string => {
  if (s[s.length - 1] === " ") {
    return s.substring(0, s.length - 1);
  } else {
    return s;
  }
};

export const addBeginSpace = (s: string): string => {
  if (s[0] === " ") {
    return s;
  } else {
    return " " + s;
  }
};

export const addEndSpace = (s: string): string => {
  if (s[s.length - 1] === " ") {
    return s;
  } else {
    return s + " ";
  }
};
