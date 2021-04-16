// ------------------------------------------------------------------------------
// name: store
// author: mudas( mschool.tech )
// created: 2021/3/23 1:19
// ------------------------------------------------------------------------------

import { isAbsoluteURL, mergeURL } from '@mudas/util';

export function prefixURL(url) {
  if (isAbsoluteURL(url)) return url;
  return mergeURL('//img.blibao.com/', url);
}
