const API_URL = "http://localhost:3001/campaigns";

export function getAllCampaigns(onlyApproved) {
  return fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      if (onlyApproved) {
        return data.filter((c) => c.isApproved === true);
      } else {
        return data;
      }
    })
    .catch((err) => {
      console.log("Error getting campaigns:", err);
      return [];
    });
}
export async function getCampaignById(id) {
  try {
    const res = await fetch(`http://localhost:3001/campaigns/${id}`);
    if (!res.ok) throw new Error("Failed to fetch campaign");

    return await res.json();
  } catch (error) {
    console.error("Get campaign by ID error:", error);
    return null;
  }
}

export async function addCampaign(newCampaign) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCampaign),
    });

    if (!res.ok) throw new Error("Failed to add campaign");

    return await res.json();
  } catch (error) {
    console.error("Add campaign error:", error);
    return null;
  }
}

export async function updateCampaign(id, updatedData) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) throw new Error("Failed to update campaign");

    return await res.json();
  } catch (error) {
    console.error("Update campaign error:", error);
    return null;
  }
}

export async function deleteCampaign(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete campaign");

    return true;
  } catch (error) {
    console.error("Delete campaign error:", error);
    return false;
  }
}
