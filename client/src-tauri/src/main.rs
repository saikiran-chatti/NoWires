#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{
  api::process::{Command}
};

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      tauri::async_runtime::spawn(async move {
        let (mut rx, mut child) = Command::new_sidecar("app")
          .expect("failed to setup `app` sidecar")
          .spawn()
          .expect("Failed to spawn packaged node");
      });
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("failed to run app");
}
