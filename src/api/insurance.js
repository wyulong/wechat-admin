import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/insurance/admin/list',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/insurance/admin/edit',
    method: 'post',
    data
  })
}

export function deleteDate(data) {
  return request({
    url: '/insurance/deleteInsurance',
    method: 'post',
    data
  })
}

