import { requestUtils } from '@/utils'

export function login(data) {
  return requestUtils.service({
    path: '/comm/login',
    method: 'post',
    data
  })
}

