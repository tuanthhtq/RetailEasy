package org.retaileasy.retaileasyserver.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

/**
 * @author tuan
 */
public class UploadHelper {
	public static String upload(MultipartFile file) {
		String dir = System.getProperty("user.dir") + "/images";

		if (file.isEmpty()) {
			return null;
		}

		try {
			// Create uploads directory if not exists
			File directory = new File(dir);
			if (!directory.exists()) {
				directory.mkdirs();
			}

			// Get the file extension
			String originalFilename = file.getOriginalFilename();
			String fileExtension = "";
			int lastDotIndex = originalFilename.lastIndexOf('.');
			if (lastDotIndex > 0) {
				fileExtension = originalFilename.substring(lastDotIndex);
			}

			// Generate a unique filename
			String fileName = UUID.randomUUID().toString().replace("-", "") + fileExtension;

			// Save the file to the upload directory
			byte[] bytes = file.getBytes();
			Path path = Paths.get(dir + "/" + fileName);
			Files.write(path, bytes);

			// Process the title and save to database (you can implement your logic here)

			return fileName;
		} catch (Exception e) {
			return null;
		}
	}


	public static boolean deleteFile(String fileName) {
		String dir = System.getProperty("user.dir") + "/images";

		try {
			Path filePath = Paths.get(dir, fileName);

			// Check if the file exists before attempting to delete
			if (Files.exists(filePath)) {
				Files.delete(filePath);
				return true; // File deleted successfully
			} else {
				return false; // File doesn't exist
			}
		} catch (Exception e) {
			return false; // Deletion failed
		}
	}


}
