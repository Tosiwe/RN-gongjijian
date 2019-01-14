import request from "../utils/request";

// 车辆条件检索
export async function carListSearch(params) {
    return request(`/api/vdp/v1/vehicle/search`, {
        method: "POST",
        body: params,
    });
}


// 布控搜索
export async function bkSearch(params) {
    return request(
        `/api/vdp/v1/disposition/vehicle/mda-config?page_num=${params.page_num}&page_size=${
        params.page_size
        }&keyWord=${params.keyWord}&t=${new Date().getTime()}`
    );
}

// 布控列表
export async function addBkList(params) {
    return request(
        `/api/vdp/v1/disposition/vehicle/mda-config?page_num=${params.page_num}&page_size=${
        params.page_size
        }&t=${new Date().getTime()}`
    );
    // return request(
    //     `http://192.168.110.15:80/api/vdp/v1/disposition/vehicle/config?page_num=${params.page_num}
    //     &page_size=${params.page_size}&t=${new Date().getTime()}`
    // );
}

// 布控-告警记录
export async function addAlarmList(params) {
    return request(
        // `http://192.168.110.15:80/api/vdp/v1/disposition/vehicle/config?${params.id}`
        // `http://192.168.110.15:80/api/vdp/v1/disposition/vehicle/notification?id=10002&t=${new Date().getTime()}`
        // `/api/vdp/v1/disposition/vehicle/notification/${params.id}`
        // `/api/vdp/v1/disposition/vehicle/notification?id=${params.id}&t=${new Date().getTime()}`
        `/api/vdp/v1/disposition/vehicle/mda-notification/findbyid?id=${params.id}&t=${new Date().getTime()}`
    );
}


// 新建布控
export async function addBk(params) {
    return request(`/api/vdp/v1/disposition/vehicle/mda-config`, {
        method: "POST",
        body: params,
    });
}

// 删除布控
export async function deleteBk(params) {
    return request(`/api/vdp/v1/disposition/vehicle/mda-config`, {
        method: "DELETE",
        body: params,
    });
}

// 修改布控
// http://192.168.110.15:80
export async function modifyBk(params) {
    return request(`/api/vdp/v1/disposition/vehicle/mda-config`, {
        method: "PUT",
        body: params,
    });
}

// 切换布控状态
export async function exchangeBk(params) {
    return request(`/api/vdp/v1/disposition/vehicle/mda-config/update-status`, {
        method: "PUT",
        body: params,
    });
}

// 历史告警列表
export async function addalertTable(params) {
    return request(
        // `/api/vdp/v1/disposition/vehicle/notification/notification-history?page_num=${params.page_num}&page_size=${
        // params.page_size
        // }&t=${new Date().getTime()}`
        `/api/vdp/v1/disposition/vehicle/mda-notification?page_num=${params.page_num}&page_size=${params.page_size}&start_time=${params.start_time}&end_time=${params.end_time}&t=${new Date().getTime()}`
    );
}

// 历史搜索
export async function alertSearch(params) {
    return request(
        `/api/vdp/v1/disposition/vehicle/mda-notification?page_num=${params.page_num}&page_size=${
        params.page_size
        }&plate_no=${params.plate_no
        }&start_time=${params.start_time
        }&end_time=${params.end_time
        }&vehicle_color=${params.vehicle_color}&reason_id=${params.reason_id}&t=${new Date().getTime()}`
    );
}


// 布控状态排序
export async function dostyleChange(params) {
    return request(
        `/api/vdp/v1/disposition/vehicle/mda-config?page_num=${params.page_num
        }&page_size=${
        params.page_size
        }&order_field=${
        params.order_field
        }&order_rule=${
        params.order_rule
        }&t=${new Date().getTime()}`
    );
}
// 告警已读
export async function doAlreadyRead(params) {
    return request(`/api/vdp/v1/disposition/notification-manage/records`, {
        method: "PUT",
        body: params,
    });
}

// 车辆抠图
export async function setCarImage(params) {
    return request(`/api/vdp/v1/vehicle/image-matting`, {
        method: "POST",
        body: params,
    });
}

// 以图搜车历史
export async function searchCarHistory() {
    return request(`/api/vdp/v1/vehicle/search-history?t=${new Date().getTime()}`, {
        method: "GET",
    });
}

// 删除以图搜车历史
export async function deleteCarHistory() {
    return request(`/api/vdp/v1/vehicle/search-history`, {
        method: "DELETE",
    });
}

// url转base64
export async function url2base64Server(params) {
    return request("/api/vdp/v1/face/url2base64", {
        method: "POST",
        body: {
            urls: [params],
        },
    });
}

// 车辆条件检索
export async function eCarListSearch(params) {
    const url = `?extern_channel=WLW${
        params.doorway_name ? `&doorway_name=${  params.doorway_name}` : ""
        }${
        params.plate_no ? `&vehicle_number=${  params.plate_no}` : ""
        }${
        params.start_time ? `&start_time=${  params.start_time}` : ""
        }${
        params.end_time ? `&end_time=${  params.end_time}` : ""
        }${
        params.page_num ? `&page_num=${  params.page_num}` : ""
        }${
        params.page_size ? `&page_size=${  params.page_size}` : ""
        }`
    return request(`/api/vdp/v1/vehicle/elecmobile/guard${url}`);
}