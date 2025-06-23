type Indexed<T = Record<string, unknown>> = Record<string, T>;

const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  for (const p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
};

export { merge };
