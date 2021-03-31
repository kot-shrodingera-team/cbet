const getCbetOddName = (marketName: string): string => {
  const { odd, param, bet_type, groups } = JSON.parse(worker.ForkObj);

  const parameter = Number(param);
  if (odd) {
    if (/^ML1$/i.test(odd)) {
      return '1';
    }
    if (/^ML2$/i.test(odd)) {
      return '2';
    }
    if (/^1$/i.test(odd)) {
      return '1';
    }
    if (/^X$/i.test(odd)) {
      return 'X';
    }
    if (/^2$/i.test(odd)) {
      return '2';
    }
    if (/^1X$/i.test(odd)) {
      return '1X';
    }
    if (/^12$/i.test(odd)) {
      return '12';
    }
    if (/^X2$/i.test(odd)) {
      return 'X2';
    }
    if (/^Y$/i.test(odd)) {
      return 'Yes';
    }
    if (/^N$/i.test(odd)) {
      return 'No';
    }
    if (/^F1$/i.test(odd)) {
      if (parameter === 0) {
        return '1';
      }
      return `1 (${parameter})`;
    }
    if (/^F2$/i.test(odd)) {
      if (parameter === 0) {
        return '2';
      }
      return `2 (${parameter})`;
    }
    if (/^TO$/i.test(odd)) {
      if (/exact goals 3+/i.test(marketName)) {
        if (parameter === 2.5) {
          return '3+';
        }
        return '';
      }
      return `Over (${parameter})`;
    }
    if (/^TU$/i.test(odd)) {
      return `Under (${parameter})`;
    }
  }
  if (/^P1$/i.test(groups.plr)) {
    if (/HANDICAP/i.test(bet_type)) {
      if (parameter === 0) {
        return '1';
      }
      return `1 (${parameter})`;
    }
    return '1';
  }
  if (/^P2$/i.test(groups.plr)) {
    if (/HANDICAP/i.test(bet_type)) {
      if (parameter === 0) {
        return '2';
      }
      return `2 (${parameter})`;
    }
    return '2';
  }
  if (/^PX$/i.test(groups.plr)) {
    return 'X';
  }
  if (/^1X$/i.test(groups.plr)) {
    return '1X';
  }
  if (/^12$/i.test(groups.plr)) {
    return '12';
  }
  if (/^X2$/i.test(groups.plr)) {
    return 'X2';
  }
  if (/^YES$/i.test(groups.dst)) {
    return 'Yes';
  }
  if (/^NO$/i.test(groups.dst)) {
    return 'No';
  }
  if (/^OVER$/i.test(groups.dst)) {
    if (/exact goals 3+/i.test(marketName)) {
      if (parameter === 2.5) {
        return '3+';
      }
      return '';
    }
    return `Over (${parameter})`;
  }
  if (/^UNDER$/i.test(groups.dst)) {
    return `Under (${parameter})`;
  }

  return '';
};

export default getCbetOddName;
