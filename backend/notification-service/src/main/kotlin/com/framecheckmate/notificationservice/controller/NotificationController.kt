package com.framecheckmate.notificationservice.controller

import com.framecheckmate.notificationservice.dto.request.NotificationSaveRequest
import com.framecheckmate.notificationservice.dto.response.NotificationInfoResponse
import com.framecheckmate.notificationservice.dto.response.NotificationSaveResponse
import com.framecheckmate.notificationservice.entity.NotificationType
import com.framecheckmate.notificationservice.service.CustomMailSender
import com.framecheckmate.notificationservice.service.NotificationService
import org.springframework.cloud.client.discovery.EnableDiscoveryClient
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@EnableDiscoveryClient
@RestController
@RequestMapping("/notification")
class NotificationController(
    val notificationService: NotificationService,
) {

    @PostMapping()
    fun sendNotification(@RequestBody notificationSaveRequest: NotificationSaveRequest): ResponseEntity<NotificationSaveResponse> {
        return ResponseEntity.ok(notificationService.saveNotification(notificationSaveRequest))
    }

    @GetMapping("/go")
    fun sendTest() {
        notificationService.saveNotification(NotificationSaveRequest(
            "drasgon@naver.com",
            NotificationType.ALLOCATION
        ))
    }

    @GetMapping("/{email}")
    fun getAllNotificationsByEmail(@PathVariable(value = "email") email : String) : ResponseEntity<List<NotificationInfoResponse>> {
        return ResponseEntity.ok(notificationService.getNotificationsByEmail(email))
    }
}
