import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/guidance/listGuidance',
    method: 'post',
    data
  })
}

export function addData(data) {
  return request({
    url: '/guidance/addGuidance',
    method: 'post',
    data
  })
}

export function getData(id) {
  return request({
    url: '/guidance/addGuidance',
    method: 'get',
    params: { id }
  })
}

export function editData(data) {
  return request({
    url: '/guidance/editGuidance',
    method: 'post',
    data
  })
}

export function deleteDate(data) {
  return request({
    url: '/guidance/deleteGuidance',
    method: 'post',
    data
  })
}

