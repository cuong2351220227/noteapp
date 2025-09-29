<template>
  <div class="sidebar-invite-member" v-if="showInvite">
    <div class="invite-content">
      <span class="icon">👤</span>
      <div class="invite-text">
        <div class="invite-title">Mời thành viên</div>
        <div class="invite-subtitle">Hợp tác với nhóm của bạn.</div>
      </div>
      <span class="close-icon" @click="closeInvite">❌</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InviteMember',
  data() {
    return {
      showInvite: true
    }
  },
  methods: {
    closeInvite() {
      this.showInvite = false;
    }
  }
}
</script>

<style scoped>
.sidebar-invite-member {
  padding: 10px;
  background-color: #e6e6e6;
  border-radius: 5px;
  margin: 10px;
}

.invite-content {
  display: flex;
  align-items: center;
}

.invite-content .icon {
  font-size: 20px;
  margin-right: 10px;
}

.invite-text {
  flex-grow: 1;
}

.invite-title {
  font-weight: bold;
  font-size: 13px;
}

.invite-subtitle {
  font-size: 11px;
  color: #666;
}

.close-icon {
  font-size: 12px;
  color: #999;
  cursor: pointer;
}

.close-icon:hover {
  color: #666;
}
</style>