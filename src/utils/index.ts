// https://github.com/imzbf/md-editor-v3/blob/develop/packages/MdEditor/utils/index.ts

/**
 * 获取元素相对目标元素顶部位置
 * 代码来自antd
 *
 * @param element
 * @param container
 * @returns
 */
export const getRelativeTop = (
  element: HTMLElement,
  container: HTMLElement | undefined
): number => {
  // 尝试移除元素不存在的潜在问题（https://github.com/imzbf/md-editor-v3/issues/308）
  if (!element || !container) {
    return 0;
  }

  const eleRect = element?.getBoundingClientRect();

  if (container === document.documentElement) {
    return eleRect.top - container.clientTop;
  }

  const conRect = container?.getBoundingClientRect();

  return eleRect.top - conRect.top;
};

export function mdHeadingId(text: string, level: number, index: number) {
  return `${text}/${level}-${index}`;
}

export function getToken() {
  return getCookie("token");
}
export function getUserId() {
  return getCookie("uid");
}
export function getCookie(name: string) {
  return document.cookie.match(`[;\s+]?${name}=([^;]*)`)?.pop();
}

export function setCookie(name: string, val: any) {
  var exp = new Date();
  exp.setDate(exp.getDate() + 30);
  document.cookie = `${name}=${val};expires=${exp.toUTCString()}`;
}

export function delCookie(name: string) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
}
